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
export async function manipulateMessage(method, url, messageData) {
  let errorMessage = "Could not create the message";

  if (method === "put") {
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

// delete a message
export async function deleteMessage(userId, messageId) {
  const res = await fetch(
    `http://localhost:3000/messages/delete/${userId}/${messageId}`,
    { method: "delete", credentials: "include" }
  );

  console.log(res);

  if (!res.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not delete the message" }),
      { status: 500 }
    );
  }

  const data = await res.json();
  return data;
}
