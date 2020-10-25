import React, { useState } from 'react';

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

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { avatar_url, name } = user;

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
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars0.githubusercontent.com/u/41973973?v=4"
                alt="Wiliam Lee"
              />

              <strong>Wiliam Lee</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/41973973?v=4"
                  alt="Wiliam Lee"
                />

                <strong>Wiliam Lee</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/41973973?v=4"
                  alt="Wiliam Lee"
                />

                <strong>Wiliam Lee</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/41973973?v=4"
                  alt="Wiliam Lee"
                />

                <strong>Wiliam Lee</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/41973973?v=4"
                  alt="Wiliam Lee"
                />

                <strong>Wiliam Lee</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
