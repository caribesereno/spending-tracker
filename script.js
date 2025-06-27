const supabase = supabase.createClient(
  'https://YOUR_PROJECT_URL.supabase.co',
  'YOUR_PUBLIC_ANON_KEY'
);

async function signUp() {
  const { user, error } = await supabase.auth.signUp({
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  });
  alert(error ? error.message : 'Sign-up successful!');
}

async function signIn() {
  const { user, error } = await supabase.auth.signInWithPassword({
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  });
  alert(error ? error.message : 'Logged in!');
  document.getElementById('tracker-section').style.display = 'block';
}

async function signOut() {
  await supabase.auth.signOut();
  alert('Logged out');
  document.getElementById('tracker-section').style.display = 'none';
}

document.getElementById('expense-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = (await supabase.auth.getUser()).data.user;

  const { error } = await supabase
    .from('expenses')
    .insert([{
      user_id: user.id,
      amount: parseFloat(document.getElementById('amount').value),
      category: document.getElementById('category').value,
      note: document.getElementById('note').value,
      date: document.getElementById('date').value
    }]);

  document.getElementById('message').textContent = error
    ? error.message
    : 'Expense added!';
});
