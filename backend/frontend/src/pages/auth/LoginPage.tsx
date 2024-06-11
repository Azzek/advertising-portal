import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormWrapper from './FormWrapper'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema } from "@/schema"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Cookies from 'universal-cookie'

const cookies = new Cookies()



const LoginPage = () => {

  const [error, setError] = useState("")

  const navigate = useNavigate()

  const isResponseOk = (response:Response) => {

    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }



  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      email:"",
      password: "",
      confirmPassword:""
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    fetch('/api/login/', {
      method:'POST',
      headers:{
        "ContentType":'application/json',
        "X-CSRFToken": cookies.get('csrftoken')
      },
      credentials:"same-origin",
      body: JSON.stringify({
        username:values.username,
        password:values.password
      })
    })
    .then((res:Response)=>{
      isResponseOk(res).then(() => {
        navigate('/')
      })
    })
    .catch((err) => {
      console.log(err)

      setError("Wrong username or password")
    })

  }

  return (
    <div className='bg-slate-900 w-screen h-screen flex justify-center align-middle items-center'>
        <FormWrapper title='Login' label='Login to your account' backButtonLabel='Dont have an account? Register here' backButtonHref='/Register'>
            <h1>{error}</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className='space-y-4'>

                  <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} type='text' placeholder='Andrew'/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                  />

                  <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type='password' placeholder=''/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                  />
                </div>
                <Button type='submit' className='w-full'>
                  Login
                </Button>
              </form>
            </Form>
        </FormWrapper>
    </div>
  )
}

export default LoginPage