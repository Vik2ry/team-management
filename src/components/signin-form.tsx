'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const signInSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be 8 or more digits' }),
})

type Inputs = z.infer<typeof signInSchema>

interface AuthResponse {
  token: string
}

interface ErrorResponse {
  message: string
}

export function SignInForm() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: Inputs) {
    setLoading(true)
    try {
      console.log('data', data);
      
      const response = await axios.post<AuthResponse>('/api/auth', data)
      console.log('response', response);
      
      localStorage.setItem('token', response.data.token)
      toast.success('Signed in successfully')
      router.push('/dashboard')
    } catch (err) {
      const errorResponse: ErrorResponse =
        (axios.isAxiosError(err) && (err.response?.data as ErrorResponse)) ||
        { message: 'Invalid email or password' }
      toast.error(errorResponse.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-normal">Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your email" 
                  type="email"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-normal">Password</FormLabel>
              <FormControl>
                <Input 
                  type="password"
                  placeholder="Enter your password" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div className="flex items-center justify-end">
          <Button 
            variant="link" 
            className="px-0 text-green-600 hover:text-green-700"
            onClick={(e) => {
              e.preventDefault()
              router.push('/forgot-password')
            }}
          >
            Forgot password?
          </Button>
        </div> */}
        <Button 
          className="mt-2 bg-green-600 hover:bg-green-700" 
          disabled={loading}
        >
          {loading && (
            <Loader2
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Sign In
          <span className="sr-only">Sign in to your account</span>
        </Button>
      </form>
    </Form>
  )
}

