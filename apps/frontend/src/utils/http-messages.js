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

// create and update message
export async function manipulateMessage(
  method,
  userId,
  messageId,
  messageData
) {
  let url = "http://localhost:3000/messages/create";
  let errorMessage = "Could not create the message";

  if (method === "put") {
    url = `http://localhost:3000/messages/update/${userId}/${messageId}`;
    errorMessage = "Could not update the message";
  }

  const res = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(messageData),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
    });
  }

  const data = await res.json();
  return data;
}
