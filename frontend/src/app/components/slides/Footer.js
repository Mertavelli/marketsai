

export default function Footer({ metrics = {}, pageNumber }) {
    return (
        <div className="flex justify-end items-center text-[0.6rem] gap-4 absolute bottom-2 right-10 border-t border-border pt-1 w-[90%]">
            <p>{metrics?.company_profile?.company_name}</p>
            <p>{pageNumber}</p>
        </div>
    )
}