import { useEffect, useState } from 'react';
import { Form, usePage } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController';
import { apiFetch } from '@/lib/api';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SettingsModal({ open, onOpenChange }: Props) {
  const page: any = usePage();
  const auth = page?.props?.auth;
  const [tab, setTab] = useState<'perfil' | 'senha' | 'contato'>('perfil');
  const [contact, setContact] = useState<{ email?: string | null; phone?: string | null; whatsapp?: string | null; whatsapp_link?: string | null }>({});

  // Carrega contato ao abrir
  useEffect(() => {
    let ignore = false;
    if (open) {
      apiFetch('/api/settings/contact')
        .then((res: any) => res?.contact)
        .then((c) => { if (!ignore && c) setContact(c); })
        .catch(() => {});
    }
    return () => { ignore = true };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-xl" aria-describedby="settings-desc">
        <DialogHeader>
          <DialogTitle>ConfiguraÃ§Ãµes</DialogTitle>
          <DialogDescription id="settings-desc">Gerencie suas informaÃ§Ãµes de perfil e senha.</DialogDescription>
        </DialogHeader>

        {/* Tabs simples */}
        <div className="mb-4 flex items-center gap-2">
          <button
            className={`rounded-md px-3 py-1 text-sm ${tab === 'perfil' ? 'bg-black text-white' : 'bg-muted'}`}
            onClick={() => setTab('perfil')}
          >
            Perfil
          </button>
          <button
            className={`rounded-md px-3 py-1 text-sm ${tab === 'senha' ? 'bg-black text-white' : 'bg-muted'}`}
            onClick={() => setTab('senha')}
          >
            Senha
          </button>
          <button
            className={`rounded-md px-3 py-1 text-sm ${tab === 'contato' ? 'bg-black text-white' : 'bg-muted'}`}
            onClick={() => setTab('contato')}
          >
            Contato
          </button>
        </div>

        {tab === 'perfil' && (
          <div className="space-y-4">
            <Form {...ProfileController.update.form()} options={{ preserveScroll: true }} className="space-y-4">
              {({ processing, errors }) => (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" name="name" defaultValue={auth?.user?.name || ''} placeholder="Seu nome" />
                    <InputError message={errors.name} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" name="email" defaultValue={auth?.user?.email || ''} placeholder="email@exemplo.com" />
                    <InputError message={errors.email} />
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={processing} className="w-auto">Salvar</Button>
                  </DialogFooter>
                </>
              )}
            </Form>
          </div>
        )}

        {tab === 'senha' && (
          <div className="space-y-4">
            <Form {...PasswordController.update.form()} className="space-y-4">
              {({ processing, errors }) => (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="current_password">Senha atual</Label>
                    <Input id="current_password" type="password" name="current_password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
                    <InputError message={errors.current_password} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Nova senha</Label>
                    <Input id="password" type="password" name="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
                    <InputError message={errors.password} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">Confirmar senha</Label>
                    <Input id="password_confirmation" type="password" name="password_confirmation" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
                    <InputError message={errors.password_confirmation} />
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={processing} className="w-auto">Atualizar senha</Button>
                  </DialogFooter>
                </>
              )}
            </Form>
          </div>
        )}

        {tab === 'contato' && (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="contact_email">E-mail de contato</Label>
              <Input id="contact_email" value={contact.email ?? ''} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="contato@exemplo.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact_phone">Telefone</Label>
              <Input id="contact_phone" value={contact.phone ?? ''} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="(62) 99999-9999" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact_whatsapp">WhatsApp (apenas nÃºmeros, com DDD e DDI)</Label>
              <Input id="contact_whatsapp" value={contact.whatsapp ?? ''} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} placeholder="5562999999999" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact_whatsapp_link">Link WhatsApp (opcional)</Label>
              <Input id="contact_whatsapp_link" value={contact.whatsapp_link ?? ''} onChange={(e) => setContact({ ...contact, whatsapp_link: e.target.value })} placeholder="https://wa.me/5562999999999" />
            </div>
            <DialogFooter>
              <Button
                className="w-auto"
                onClick={async () => {
                  await apiFetch('/api/admin/settings/contact', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(contact) });
                  onOpenChange(false);
                }}
              >
                Salvar contato
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}




