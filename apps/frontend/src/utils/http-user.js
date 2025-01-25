// get user
export async function fetchUser() {
  const res = await fetch("http://localhost:3000/auth/me", {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not fetch the user, Correctly." }),
      { status: 500 }
    );
  }

  return data;
}

// register a user
export async function registerUser(method, userData) {
  const res = await fetch("http://localhost:3000/auth/register", {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not register the user." }),
      { status: 500 }
    );
  }

  const data = await res.json();
  return data.user;
}

// login a user
export async function loginUser(method, userData) {
  const res = await fetch("http://localhost:3000/auth/login", {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not login the user." }),
      { status: 500 }
    );
  }

  const data = await res.json();
  return data.user;
}

// log out a user
export async function logoutLoader(method) {
  const res = fetch("http://localhost:3000/auth/logout", {
    method: method,
    credentials: "include",
  });

  if (!res) {
    throw new Response(
      JSON.stringify({ message: "Could not logout the user." }),
      { status: 500 }
    );
  }
}
