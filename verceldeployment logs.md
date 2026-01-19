 18:08:07.909 Failed to compile.
18:08:07.910 Module not found: Can't resolve '@/legal_branches/_base.json'
18:08:07.911 Module not found: Can't resolve '@/legal_branches/_kb_schema.json'
18:08:07.911 Module not found: Can't resolve '@/legal_branches/succession_law/succession_heirship_declaration.json'
18:08:07.911 Module not found: Can't resolve '@/legal_branches/succession_law/succession_probate_will.json'
18:08:07.911 Module not found: Can't resolve '@/legal_branches/succession_law/succession_partition_estate.json'
18:08:07.989 Error: Command "npm run build" exited with 1

https://nextjs.org/docs/messages/module-not-found
Import trace for requested module:
./app/page.tsx
./src/lib/data.ts
Module not found: Can't resolve '@/legal_branches/succession_law/succession_partition_estate.json'
https://nextjs.org/docs/messages/module-not-found
Import trace for requested module:
./app/page.tsx
> Build failed because of webpack errors
Error: Command "npm run build" exited with 1
