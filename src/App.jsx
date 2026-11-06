alter table colaboradores enable row level security;

create policy "Permitir leitura publica em colaboradores" 
on colaboradores for select 
using (true);

create policy "Permitir insercao publica em colaboradores" 
on colaboradores for insert 
with check (true);

create policy "Permitir atualizacao publica em colaboradores" 
on colaboradores for update 
using (true);
