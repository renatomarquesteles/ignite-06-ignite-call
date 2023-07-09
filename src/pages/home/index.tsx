import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'

import { ClaimUsernameForm } from './components/ClaimUsernameForm'

import { Container, Hero, Preview } from './styles'

import previewImage from '../../assets/app-preview.png'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size="4xl">
          Easy scheduling
        </Heading>
        <Text size="xl">
          Connect your calendar and let people book appointments on their own
          time.
        </Text>

        <ClaimUsernameForm />
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          alt="Dark themed calendar of September with some days highlighted"
          height={400}
          quality={100}
          priority
        />
      </Preview>
    </Container>
  )
}
