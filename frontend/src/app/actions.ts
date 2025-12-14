"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const apiUrl = process.env.API_URL;

export async function login(phoneNumber: string, password: string) {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, password }),
    });

    if (!response.ok) {
      return { success: false, error: "Login failed" };
    }

    const data = await response.json();
    const token = data.token;

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1h
    });
    return { token };
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  (await cookies()).set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  redirect("/login");
}

export async function getProfile(token: string) {
  if (token) {
    const response = await fetch(`${apiUrl}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    }
  }
}

export async function getUsers(token: string) {
  if (token) {
    const response = await fetch(`${apiUrl}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    }
  }
}

export async function getUser(token: string, userId: string) {
  if (token) {
    const response = await fetch(`${apiUrl}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    }
  }
}

export async function getTenants(token: string) {
  if (token) {
    const response = await fetch(`${apiUrl}/tenants`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    }
  }
}

export async function getTenant(token: string, tenantId: string) {
  if (token) {
    const response = await fetch(`${apiUrl}/tenant/${tenantId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    }
  }
}

export async function getRooms(token: string) {
  if (token) {
    const response = await fetch(`${apiUrl}/rooms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    }
  }
}

export async function getRoom(token: string, roomId: string) {
  if (token) {
    const response = await fetch(`${apiUrl}/room/${roomId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    }
  }
}

export async function getPayments(token: string) {
  if (token) {
    const response = await fetch(`${apiUrl}/payments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    }
  }
}

export async function getPayment(token: string, paymentId: string) {
  if (token) {
    const response = await fetch(`${apiUrl}/payment/${paymentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    }
  }
}
