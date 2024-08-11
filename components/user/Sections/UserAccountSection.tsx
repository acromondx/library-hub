"use client";
import React, { useState } from "react";
import { Bookmark, Loan, User, Request } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    hasChangedDefaultPassword: boolean | null;
    profilePicture: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
    bookmarks: Bookmark[];
    loans: Loan[];
    requests: Request[];
  };
}

export function UserAccountSection({ user }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // await onUpdateUser(editedUser);
    setIsEditing(false);
  };

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.profilePicture || ""} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="info">
          <TabsList>
            <TabsTrigger value="info">User Info</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={editedUser.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="profilePicture">Profile Picture URL</Label>
                  <Input
                    id="profilePicture"
                    name="profilePicture"
                    value={editedUser.profilePicture || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="submit">Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </form>
            ) : (
              <div className="space-y-2">
                <p>
                  <strong>Phone:</strong> {user.phoneNumber}
                </p>

                <p>
                  <strong>Member Since:</strong>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="activity">
            <div className="space-y-2">
              <p>
                <strong>Loans:</strong> {user.loans?.length || 0}
              </p>
              <p>
                <strong>Requests:</strong> {user.requests?.length || 0}
              </p>
              <p>
                <strong>Bookmarks:</strong> {user.bookmarks?.length || 0}
              </p>
              <p>
                <strong>Last Updated:</strong>{" "}
                {new Date(user.updatedAt).toLocaleString()}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">User ID: {user.id}</p>
      </CardFooter>
    </Card>
  );
}
