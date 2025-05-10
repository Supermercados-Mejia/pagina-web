interface UserCardProps {
    name?: string;
    email?: string;
    avatarUrl: string;
}
export function UserCard({ name, email, avatarUrl }: UserCardProps) {
    return (
        <div className="user-card">
            <img src={avatarUrl} alt={`${name}'s avatar`} className="user-card__avatar" />
            <div className="user-card__info">
                <h2 className="user-card__name">{name}</h2>
                <p className="user-card__email">{email}</p>
            </div>
        </div>
    );
};

export function OffertCard({ avatarUrl }: UserCardProps) {
    return (
        <div className="flex flex-col items-center justify-center m-2 min-w-40 min-h-40 max-w-40 max-h-40 bg-white dark:bg-zinc-800 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden">
            <img src={avatarUrl} loading="lazy" alt="" />
        </div>
    );
};