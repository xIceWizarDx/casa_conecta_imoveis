import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { useEffect, useMemo, useState } from 'react';
import { digitsOnly, formatBrazilPhoneFromDigits } from '@/lib/contact';

export default function Register() {
    const [password, setPassword] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [whats, setWhats] = useState('');
    const [waLink, setWaLink] = useState('');

    useEffect(() => {
        const d = digitsOnly(whats);
        setWaLink(d ? `https://wa.me/${d}` : '');
    }, [whats]);

    const pwdScore = useMemo(() => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score; // 0..4
    }, [password]);

    const meterColor = ['bg-gray-300','bg-red-500','bg-yellow-500','bg-lime-500','bg-green-600'][pwdScore];

    return (
        <AuthLayout title="Criar conta" description="Preencha seus dados para criar sua conta">
            <Head title="Registrar" />
            <Form
                {...RegisteredUserController.store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nome completo</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Mín. 8 caracteres, maiúscula, minúscula e símbolo"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="mt-1 h-2 w-full bg-muted rounded">
                                    <div className={`h-full rounded ${meterColor}`} style={{ width: `${(pwdScore/4)*100}%` }} />
                                </div>
                                <ul className="mt-1 text-xs text-muted-foreground list-disc pl-4">
                                    <li className={password.length >= 8 ? 'text-green-600' : ''}>Mínimo 8 caracteres</li>
                                    <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>Uma letra maiúscula</li>
                                    <li className={/[a-z]/.test(password) ? 'text-green-600' : ''}>Uma letra minúscula</li>
                                    <li className={/[^A-Za-z0-9]/.test(password) ? 'text-green-600' : ''}>Um caractere especial</li>
                                </ul>
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Confirmar senha</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirme a senha"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            {/* Contato obrigatório */}
                            <div className="grid gap-2">
                                <Label htmlFor="contact_email">E-mail de contato</Label>
                                <Input id="contact_email" name="contact_email" type="email" required placeholder="contato@exemplo.com" />
                                <InputError message={(errors as any).contact_email} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="contact_phone">Telefone</Label>
                                <Input
                                    id="contact_phone"
                                    name="contact_phone"
                                    required
                                    placeholder="(62) 99999-9999"
                                    value={contactPhone}
                                    onChange={(e) => {
                                        const digits = digitsOnly(e.target.value);
                                        setContactPhone(formatBrazilPhoneFromDigits(digits));
                                    }}
                                />
                                <InputError message={(errors as any).contact_phone} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="contact_whatsapp">WhatsApp (apenas números, com DDD e DDI)</Label>
                                <Input
                                    id="contact_whatsapp"
                                    name="contact_whatsapp"
                                    required
                                    placeholder="5562999999999"
                                    value={whats}
                                    onChange={(e) => setWhats(digitsOnly(e.target.value))}
                                />
                                <InputError message={(errors as any).contact_whatsapp} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="contact_whatsapp_link">Link WhatsApp</Label>
                                <Input id="contact_whatsapp_link" name="contact_whatsapp_link" required placeholder="https://wa.me/5562999999999" value={waLink} onChange={(e) => setWaLink(e.target.value)} />
                                <InputError message={(errors as any).contact_whatsapp_link} />
                            </div>

                            <Button type="submit" className="mt-2 w-full" tabIndex={5}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Criar conta
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Já possui conta?{' '}
                            <TextLink href={login()} tabIndex={6}>
                                Entrar
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
