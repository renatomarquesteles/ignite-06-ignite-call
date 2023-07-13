import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight, Check } from 'phosphor-react'

import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'

export default function Register() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

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
          {isSignedIn ? (
            <Button size="sm" disabled>
              Connected
              <Check />
            </Button>
          ) : (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => signIn('google')}
            >
              Connect
              <ArrowRight weight="bold" />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            Failed to connect to Google, make sure you have enabled Google
            Calendar access permissions
          </AuthError>
        )}

        <Button type="button" disabled={!isSignedIn}>
          Next Step
          <ArrowRight weight="bold" />
        </Button>
      </ConnectBox>
    </Container>
  )
}
