async function testLogin() {
  const res = await fetch("http://localhost:3000/api/auth/sign-in/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "sasuke@example.com",
      password: "qwertyuiop"
    }),
    credentials: "include"
  });

  const text = await res.text(); // Lire le corps brut
  console.log("Status:", res.status);

  try {
    const data = JSON.parse(text);
    console.log("Response JSON:", data);
  } catch (e) {
    console.log("Response text (not JSON):", text);
  }
}

testLogin().catch(console.error);
