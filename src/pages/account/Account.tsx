import { Typography } from "@/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { authService } from "@/service/authService";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js"; // Tipagem do usuário

const Account = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const { data } = await authService.getUser();
    setUser(data.user);
    console.log("Foto de perfil:", data.user?.user_metadata?.avatar_url);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 w-screen h-screen flex flex-col justify-center">
      <Typography as="h1" className="text-3xl font-semibold">
        Profile Settings
      </Typography>

      <Card>
        <CardContent className="p-6 flex flex-col gap-6 w-full">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback>
                {user?.user_metadata?.full_name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <Typography as="p" className="text-lg font-medium">
                {user?.user_metadata?.full_name || "Nome não encontrado"}
              </Typography>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Typography>Full Name</Typography>
              <Input
                id="name"
                disabled
                value={user?.user_metadata?.full_name || ""}
                readOnly
              />
            </div>

            <div>
              <Typography>Email</Typography>
              <Input
                type="email"
                disabled
                id="email"
                value={user?.email || ""}
                readOnly
              />
            </div>

            <div>
              <Typography>GitHub</Typography>
              <Input
                type="url"
                id="github"
                disabled
                value={
                  user?.user_metadata?.user_name
                    ? `https://github.com/${user.user_metadata.user_name}`
                    : ""
                }
                readOnly
              />
            </div>
            <div className="col-span-full">
              <Typography>Bio</Typography>
              <Textarea id="bio" placeholder="Short description about you..." />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;
