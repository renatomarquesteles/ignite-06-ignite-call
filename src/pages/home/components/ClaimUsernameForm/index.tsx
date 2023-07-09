import { Button, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Form, FormMessage } from './styles'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must have at least 3 characters' })
    .regex(/^([a-z0-9\\-]+)$/i, {
      message: 'Only letters, numbers, and hyphens are allowed',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="your-username"
          {...register('username')}
        />

        <Button type="submit" size="sm">
          Claim username
          <ArrowRight weight="bold" />
        </Button>
      </Form>

      <FormMessage>
        <Text size="sm">
          {errors?.username?.message
            ? errors.username.message
            : 'Enter the desired username'}
        </Text>
      </FormMessage>
    </>
  )
}
