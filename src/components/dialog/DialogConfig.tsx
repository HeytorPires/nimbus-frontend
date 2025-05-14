// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "../ui/dialog";
// import { Link } from "react-router-dom";
// import { Button } from "../ui/button";
// import { Label } from "@radix-ui/react-label";
// import { Input } from "../ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";

// interface iProps {
//   open: boolean;
//   setOpenChange: (open: boolean) => void;
//   updated_at?: Date;
//   var_env?: string;
// }

// const DialogCreateMarkers = ({ open, setOpenChange }: iProps) => (
//   <Dialog open={open} onOpenChange={setOpenChange}>
//     <DialogContent className="sm:max-w-[600px]">
//       <DialogHeader className="mx-5">
//         <DialogTitle>Create new marker</DialogTitle>
//         <DialogDescription>description</DialogDescription>
//       </DialogHeader>

//       <Tabs defaultValue="account" className="w-full">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="account" className="cursor-pointer">
//             Account
//           </TabsTrigger>
//           <TabsTrigger value="password" className="cursor-pointer">
//             Password
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="account">
//           <Card>
//             <CardHeader>
//               <CardTitle>Account</CardTitle>
//               <CardDescription>
//                 Make changes to your account here. Click save when you're done.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="space-y-1">
//                 <Label htmlFor="name">Name</Label>
//                 <Input id="name" defaultValue="Pedro Duarte" />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="username">Username</Label>
//                 <Input id="username" defaultValue="@peduarte" />
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button>Save changes</Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>

//         <TabsContent value="password">
//           <Card>
//             <CardHeader>
//               <CardTitle>Password</CardTitle>
//               <CardDescription>
//                 Change your password here. After saving, you'll be logged out.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="space-y-1">
//                 <Label htmlFor="current">Current password</Label>
//                 <Input id="current" type="password" />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="new">New password</Label>
//                 <Input id="new" type="password" />
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button>Save password</Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </DialogContent>
//   </Dialog>
// );

// export default DialogCreateMarkers;
