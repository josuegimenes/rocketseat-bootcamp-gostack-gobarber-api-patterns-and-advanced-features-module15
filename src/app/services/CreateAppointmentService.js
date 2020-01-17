import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import User from '../models/User';
import Appointment from '../models/Appointment';

import Notification from '../schemas/Notification';

import Cache from '../../lib/Cache';

class CreateAppointmentService {
  async run({ provider_id, user_id, date }) {
    /**
     * Check if provider_id is a provider
     * Verifica se provider_id é um provedor.
     */
    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkIsProvider) {
      throw new Error('You can only create appointments with providers.');
    }

    /**
     * Provider cannot schedule for himself.
     * Prestador não pode agendar para ele mesmo.
     */
    if (user_id === provider_id) {
      throw new Error('You can not to add appointment to yourself.');
    }

    /**
     * Just keep the time, zeroing the minutes and seconds.
     * Mantem apenas a hora, zerando os minutos e segundos.
     */
    const hourStart = startOfHour(parseISO(date));

    /**
     * Checks if the time to be logged has passed.
     * Verifica se a hora a ser registrada já passou.
     */
    if (isBefore(hourStart, new Date())) {
      throw new Error('Past dates are not permited.');
    }

    /**
     * Check date availability.
     * Verifica a disponibilidade da data.
     */
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      throw new Error('Appointment date is not available.');
    }

    /**
     * Stores in the database.
     * Armazena no banco de dados.
     */
    const appointment = await Appointment.create({
      user_id,
      provider_id,
      date,
    });

    /**
     * Notify appointment provider.
     * Notificar prestador de serviço.
     */
    const user = await User.findByPk(user_id); // Recuperando nome do usuário
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    /**
     * Invalidate cache
     */
    await Cache.invalidatePrefix(`user:${user.id}:appointments`);

    return appointment;
  }
}

export default new CreateAppointmentService();
