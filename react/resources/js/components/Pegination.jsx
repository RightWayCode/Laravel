import { router } from "@inertiajs/react";
import React from "react";

const Pagination = ({ paginationData, query }) => {
    const { links } = paginationData;

    const onPageChange = (link) => {
        router.get(link, query(), { preserveState: true });
    }
    return (
        <nav className="flex justify-center mt-4 space-x-2">
            {links.map((link, index) => {
                // Strip out HTML entities from labels for buttons (optional)
                const label = link.label.replace(/&laquo;|&raquo;/g, (match) => {
                    if (match === "&laquo;") return "←";
                    if (match === "&raquo;") return "→";
                    return match;
                });

                return (
                    <button key={index} onClick={() => link.url && onPageChange(link.url)}
                        disabled={!link.url}
                        className={`px-3 py-1 rounded border ${link.active
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                            } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                        dangerouslySetInnerHTML={{ __html: label }}
                    />
                );
            })}
        </nav>
    );
};

export default Pagination;
