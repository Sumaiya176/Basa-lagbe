"use client";

import {
  useEditProfileMutation,
  useResetPasswordMutation,
} from "@/redux/features/auth/authApi";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const notify = (text: string) => toast(text);

const UserProfile = () => {
  const { data: user } = useGetUserQuery(undefined);
  const [userData, setUserData] = useState<{ name: string; email: string }>();
  const [changingPassword, setChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetPassword] = useResetPasswordMutation();
  //const user = useAppSelector(currentUser);
  const [editProfile] = useEditProfileMutation();

  // Example user data (replace with API data)
  // const [user, setUser] = useState({
  //   userName: "John Doe",
  //   email: "john@example.com",
  // });

  // Handle profile update
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = {
      userName: formData.get("userName") as string,
      email: formData.get("email") as string,
    };
    //console.log(updatedUser);
    try {
      const result = await editProfile(body).unwrap();
      console.log(result);
      if (result?.isSuccess) {
        notify(result?.message);
        setUserData({
          name: result?.data?.name,
          email: result?.data?.email,
        });
      }
    } catch (err: any) {
      notify(err?.data?.message);
    }
    //setUser(updatedUser);
    setIsModalOpen(false);
  };

  const handleResetPassword = async () => {
    if (newPassword === confirmPassword) {
      const body = {
        oldPassword,
        newPassword,
        id: user?.id,
      };

      try {
        const result = await resetPassword(body).unwrap();
        console.log(result);
        if (result?.isSuccess) {
          notify(result?.message);
          setUserData({
            name: result?.data?.name,
            email: result?.data?.email,
          });
        }
      } catch (err: any) {
        notify(err?.data?.message);
      }
    } else {
      notify("Confirm password is not matched with new password!!");
    }
  };

  useEffect(() => {
    setUserData({
      name: user?.data?.userName as string,
      email: user?.data?.email as string,
    });
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body space-y-6">
          {/* Profile Info */}
          <div>
            <h2 className="card-title">My Profile</h2>
            <p className="text-sm text-gray-500 mt-2">Username</p>
            <p className="font-medium">{userData?.name}</p>
            <p className="text-sm text-gray-500 mt-3">Email</p>
            <p className="font-medium">{userData?.email}</p>
            <button
              className="btn btn-primary w-full mt-4"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </button>
          </div>

          {/* Change Password */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Reset Password</h3>
            {!changingPassword ? (
              <button
                className="btn btn-outline w-full"
                onClick={() => setChangingPassword(true)}
              >
                Reset Password
              </button>
            ) : (
              <form className="space-y-3">
                <input
                  type="password"
                  placeholder="Old Password"
                  className="input input-bordered w-full"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="input input-bordered w-full"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="input input-bordered w-full"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  onClick={() => handleResetPassword()}
                  className="btn btn-success w-full"
                >
                  Update Password
                </button>
              </form>
            )}
          </div>

          {/* Logout */}
          <div>
            <button className="btn btn-error w-full">Logout</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Profile</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-3 mt-4">
              <input
                type="text"
                name="userName"
                defaultValue={userData?.name}
                className="input input-bordered w-full"
              />
              <input
                type="email"
                name="email"
                defaultValue={userData?.email}
                className="input input-bordered w-full"
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
