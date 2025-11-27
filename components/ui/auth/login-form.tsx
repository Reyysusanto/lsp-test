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
import { LoginSchema } from '@/schema/loginSchema';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Eye, EyeOff } from 'lucide-react';
import { FormControl, FormField, FormItem, FormMessage } from '../form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { loginService } from '@/lib/auth/login.action';

const LoginForm = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { control, handleSubmit, formState } = form;

  const { mutate: loginMutation } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginService,
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        router.push('/daftar-peminjaman');
      } else {
        toast.error(response.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    loginMutation(data);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FieldGroup>
                <FormField
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder="Enter Username"
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
                            placeholder="Enter Password"
                            className="rounded-lg border-stone-700 h-10 px-4 pr-10"
                            type={showPassword ? 'text' : 'password'}
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
                    {formState.isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>

                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{' '}
                    <Button
                      variant={'ghost'}
                      type="button"
                      onClick={() => router.push('/register')}
                    >
                      Sign up
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

export default LoginForm;
