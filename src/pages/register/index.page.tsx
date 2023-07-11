import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { useForm } from 'react-hook-form'
import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { api } from '../../lib/axios'

import { Container, Form, FormError, Header } from './styles'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must have at least 3 characters' })
    .regex(/^([a-z0-9\\-]+)$/i, {
      message: 'Only letters, numbers, and hyphens are allowed',
    })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, { message: 'Name must have at least 3 characters' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerFormSchema) })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        username: data.username,
        name: data.name,
      })
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
        return
      }

      console.error(err)
    }
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Welcome to Ignite Call!</Heading>
        <Text>
          We need some information to create your profile! Oh, you can edit this
          information later.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Username</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder="your-username"
            {...register('username')}
          />

          {!!errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Full name</Text>
          <TextInput placeholder="Your name" {...register('name')} />

          {!!errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Next Step
          <ArrowRight weight="bold" />
        </Button>
      </Form>
    </Container>
  )
}
