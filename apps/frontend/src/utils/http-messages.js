// fetch all the messages
export async function fetchMessages() {
  const res = await fetch("http://localhost:3000/messages");

  if (!res.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not fetch messages" }),
      { status: 500 }
    );
  }

  const data = await res.json();
  return data.messages;
}

// fetch a single massage by Id
export async function fetchSingleMessage(userId, messageId) {
  const res = await fetch(
    `http://localhost:3000/messages/${userId}/${messageId}`
  );

  if (!res.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not fetch message data" }),
      { status: 500 }
    );
  }

  const data = await res.json();
  return data.message;
}
