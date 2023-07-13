import { signIn } from 'next-auth/react'
import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'

import { Container, Header } from '../styles'
import { ConnectBox, ConnectItem } from './styles'

export default function Register() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Connect your Calendar!</Heading>
        <Text>
          Connect your calendar to automatically check for busy hours and new
          events as they are scheduled.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => signIn('google')}
          >
            Connect
            <ArrowRight weight="bold" />
          </Button>
        </ConnectItem>

        <Button type="button">
          Next Step
          <ArrowRight weight="bold" />
        </Button>
      </ConnectBox>
    </Container>
  )
}
