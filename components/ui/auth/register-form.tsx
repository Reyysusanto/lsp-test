'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Eye, EyeOff } from 'lucide-react';
import { FormControl, FormField, FormItem, FormMessage } from '../form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import z from 'zod';
import axios from 'axios';
import { RegisterSchema } from '@/schema/registerSchema';

const RegisterForm = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
    },
  });

  const { control, handleSubmit, formState } = form;

  const { mutate: registerMutation } = useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: z.infer<typeof RegisterSchema>) => {
      const res = await axios.post('/api/register', data);
      return res.data;
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        router.push('/login');
      } else {
        toast.error(response.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    registerMutation(data);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Register your account</CardTitle>
          <CardDescription>
            Create a new account by filling in the information below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FieldGroup>
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          className="rounded-lg border-stone-700 h-10 px-4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs ml-4" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder="Enter username"
                          className="rounded-lg border-stone-700 h-10 px-4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs ml-4" />
                    </FormItem>
                  )}
                />
                <div className="relative">
                  <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="password"
                            placeholder="Enter password"
                            type={showPassword ? 'text' : 'password'}
                            className="rounded-lg border-stone-700 h-10 px-4 pr-10"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs ml-4" />
                      </FormItem>
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <Field>
                  <Button disabled={formState.isSubmitting} type="submit">
                    {formState.isSubmitting ? 'Registering...' : 'Register'}
                  </Button>
                  <FieldDescription className="text-center">
                    Already have an account?{' '}
                    <Button
                      variant={'ghost'}
                      type="button"
                      onClick={() => router.push('/login')}
                    >
                      Login
                    </Button>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
