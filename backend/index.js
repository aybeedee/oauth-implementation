const express = require('express')
const app = express()
const port = 3000

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://navarssqgacvvkcbemrx.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/api/sessions/oauth/google", async (req, res)=> {

  
  const { data, error } = await supabase
  .from('users')
  .upsert({
    email: 'someValue',
    name: '',
    picture: '',
  })
  .select()
  if (error) {
    return res.json(error)
  }
  return res.json(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})