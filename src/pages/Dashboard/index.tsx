import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns'
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiClock, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  HeaderContent,
  Profile,
  Header,
  Content,
  Schedule,
  NextAppointment,
  Calendar,
  Section,
  Appointment,
} from './styles';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import { ptBR } from 'date-fns/locale';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointments {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointments[]>([])

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const { avatar_url, name } = user;

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
  }, [currentMonth, user.id]);

  useEffect(() => {
    api.get<Appointments[]>('/appointments/me', {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate()
      }
    })
    .then(response => {
      const appointmentsFormatted = response.data.map(appointemt => {
        return {
          ...appointemt,
          hourFormatted: format(parseISO(appointemt.date), 'HH:mm')
        }
      })
      setAppointments(appointmentsFormatted)
    })
  }, [selectedDate])

  const disableDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia', dd 'de' MMMM", {
      locale: ptBR,
    })
  }, [selectedDate])

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR })
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12
    }).reverse();
  }, [appointments])

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12
    }).reverse();
  }, [appointments])

  const mextAppointment = useMemo(() => {
    return appointments.find(appointment => {
      return isAfter(parseISO(appointment.date), new Date())
    });
  }, [appointments])

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="gobarber" />
          <Profile>
            <img src={avatar_url} alt="profile" />

            <div>
              <span>Bem-vindo,</span>
              <strong>{name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}-feira</span>
          </p>

          <NextAppointment>
            <strong>Agendamento a seguir</strong>
            {
              isToday(selectedDate) && mextAppointment && (
                <Appointment key={mextAppointment.id}>
                  <span>
                    <FiClock />
                    {mextAppointment.hourFormatted}
                  </span>

                  <div>
                    <img
                      src={mextAppointment.user.avatar_url}
                      alt={mextAppointment.user.name}
                    />

                    <strong>{mextAppointment.user.name}</strong>
                  </div>
                </Appointment>
              )
            }
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            {
              morningAppointments.length === 0 && (
                <p>Nenhum agendamento neste período</p>
              )
            }

            {
              morningAppointments.map((appointment) => (
                <Appointment key={appointment.id}>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}
                  </span>

                  <div>
                    <img
                      src={appointment.user.avatar_url}
                      alt={appointment.user.name}
                    />

                    <strong>{appointment.user.name}</strong>
                  </div>
                </Appointment>
              ))
            }

            </Section>

          <Section>
            <strong>Tarde</strong>

            {
              morningAppointments.length === 0 && (
                <p>Nenhum agendamento neste período</p>
              )
            }

            {
              afternoonAppointments.map((appointment) => (
                <Appointment key={appointment.id}>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}
                  </span>

                  <div>
                    <img
                      src={appointment.user.avatar_url}
                      alt={appointment.user.name}
                    />

                    <strong>{appointment.user.name}</strong>
                  </div>
                </Appointment>
              ))
            }

          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
