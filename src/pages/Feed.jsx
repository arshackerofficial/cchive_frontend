import { useAuth } from "../context/AuthContext"
import Card from "../components/Card";

const Feed = () => {
    const {user} = useAuth();
    return (
        <div>
            <h1>Hi, {user.first_name}</h1>
            <p>Welcome back to CC Hive</p>
            <div className="flex flex-col gap-10 p-7">
                <Card
                title="Browse Marketplace"
                desc="Buy and sell stuff with other students"
                to="/marketplace"
                />
                <Card
                title="Join Study Groups"
                desc="Connect, chat, and collaborate"
                to="/study_groups"
                />
                <Card
                title="Book a Tutor"
                desc="Find help from your peers"
                to="/tutoring/request"
                />
                <Card
                title="Leave a Review"
                desc="Share your course and instructor experiences"
                to="/courses"
                />

            </div>
        </div>
    )
}


export default Feed