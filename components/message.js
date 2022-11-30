export default function Message({ children, avatar, username, description }){
    return(
        <div className="bg-white p-8 border-b-2 rounded-lg">
            <div className="flex items-center gap-2">
                <picture><img src={avatar} className="w-8 rounded-full" alt=""/></picture>
                <h2>{username}</h2>
            </div>
            <div className="py-4">
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}