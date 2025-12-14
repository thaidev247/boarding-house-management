"use client";

import { getProfile } from "../actions";
import { useEffect, useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile(localStorage.getItem("token")!);
      setProfile(data);
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}
