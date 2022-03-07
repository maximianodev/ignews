# Ignews

## Cofiguração do ambiente:  
1. Antes de rodar o projeto, configure o webhook do stripe no seu terminal rodando:
  - `stripe login` -  para se logar pelo navegador
  - `stripe listen --forward-to localhost:3000/api/webhooks` - para ativar o ouvidor de eventos do stripe

2. Configure as .Env's do Stripe, Github, FaunaDB e Contentful.

3. Rode o projeto com:
  - `yarn dev` 



### Stripe
**.ENV.LOCAL**:  
  - STRIPE_API_KEY=  
  - NEXT_PUBLIC_STRIPE_PUBLIC_KEY=  
  - STRIPE_WEBHOOK_SECRET=  

**Para ligar o webhook do stripe**:  
  - `stripe listen --forward-to localhost:3000/api/webhooks`



### Github Client ID
**.ENV.LOCAL**:  
  - GITHUB_CLIENT_ID=
  - GITHUB_CLIENT_SECRET=



### FaunaDB
**.ENV.LOCAL**:  
  - FAUNADB_KEY=