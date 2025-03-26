import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { UserType } from "@/utils/types";

interface ProfileCardProps {
	owner: UserType;
	profileImage?: string | undefined;
}
// Function to get initials from name
const getInitials = (name: string) => {
	return name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.toUpperCase()
		.substring(0, 2);
};

export default function ProfileCard({ owner, profileImage }: ProfileCardProps) {
	const initials = getInitials(owner.name);
	return (
		<Card className="w-full max-w-md border-0 shadow-none">
			<CardContent className="flex items-center gap-4 p-0">
				<Avatar className="h-20 w-20">
					{profileImage ? (
						<AvatarImage src={profileImage} alt={owner.name} />
					) : null}
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>
				<div className="space-y-1.5">
					<h3 className="text-xl font-medium">{owner.name}</h3>
					<div className="text-sm text-muted-foreground">
						<p>Owner</p>
						<p>{owner.email}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
