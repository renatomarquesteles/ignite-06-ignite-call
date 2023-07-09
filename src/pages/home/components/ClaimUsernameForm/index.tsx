import { Button, TextInput } from '@ignite-ui/react'
import { Form } from './styles'
import { ArrowRight } from 'phosphor-react'

export function ClaimUsernameForm() {
  return (
    <Form as="form">
      <TextInput size="sm" prefix="ignite.com/" placeholder="Your username" />

      <Button type="submit" size="sm">
        Claim username
        <ArrowRight weight="bold" />
      </Button>
    </Form>
  )
}
