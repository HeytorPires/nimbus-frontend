import { Typography } from "@/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback, useRef } from "react";
import { IUser } from "@/interfaces/IUser";
import { useProfileService } from "@/services/useProfileService";
import { useUserService } from "@/services/useUserService";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

const Account = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { getProfile, updateProfile } = useProfileService();
  const { updateAvatar } = useUserService();

  const fetchUser = useCallback(async () => {
    try {
      const userData = await getProfile();

      setUser(userData);
      setName(userData.name);
      setEmail(userData.email);
    } catch (error: any) {
      toast.error(error.message || "Error loading profile");
    } finally {
      setFetching(false);
    }
  }, [getProfile]);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const payload: {
        name: string;
        email: string;
        oldPassword?: string;
        password?: string;
        passwordConfirmation?: string;
      } = { name, email };

      if (oldPassword && newPassword) {
        payload.oldPassword = oldPassword;
        payload.password = newPassword;
        payload.passwordConfirmation = passwordConfirmation;
      }

      const updatedUser = await updateProfile(payload);
      setUser(updatedUser);
      setOldPassword("");
      setNewPassword("");
      setPasswordConfirmation("");
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const updatedUser = await updateAvatar(file);
      setUser(updatedUser);
      toast.success("Avatar updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error updating avatar");
    } finally {
      setUploadingAvatar(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 w-screen flex-1 flex flex-col justify-center">
      <Typography as="h1" className="text-3xl font-semibold">
        Profile Settings
      </Typography>

      <Card>
        <CardContent className="p-6 flex flex-col gap-6 w-full">
          <div className="flex items-center gap-6">
            <div
              className="relative cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {fetching ? (
                <Skeleton className="size-24 rounded-full" />
              ) : (
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.avatarUrl || undefined} />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              )}
              {uploadingAvatar ? (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                  <Loader2 className="size-6 animate-spin text-white" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs">Change</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div>
              {fetching ? (
                <Skeleton className="mb-2 h-6 w-40" />
              ) : (
                <Typography as="p" className="text-lg font-medium">
                  {user?.name || "Name not found"}
                </Typography>
              )}
              <Typography as="p" className="text-sm text-muted-foreground">
                Click the avatar to change photo
              </Typography>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Typography>Name</Typography>
              {fetching ? (
                <Skeleton className="h-9 w-full" />
              ) : (
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
            </div>

            <div>
              <Typography>Email</Typography>
              {fetching ? (
                <Skeleton className="h-9 w-full" />
              ) : (
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <Typography as="h2" className="text-lg font-medium mb-4">
              Change Password
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Typography>Current Password</Typography>
                <Input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <Typography>New Password</Typography>
                <Input
                  type="password"
                  id="new_password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <Typography>Confirm Password</Typography>
                <Input
                  type="password"
                  id="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleUpdateProfile} loading={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;
