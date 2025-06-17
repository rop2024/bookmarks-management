// classes
class bookmarks {
    constructor(name, link) {
        this.name = name.toLowerCase().trim();
        this.link = link;
        console.log("bookmark Created!");
    }
}

class bookmarks_list {
    constructor()
    {
        this.bookmark_list = []
        console.log("list successfully created");
    }

    add(name, link)
    {
        let bookmark = new bookmarks(name, link);
        this.bookmark_list.push(bookmark);
        this.save_local();
        console.log("Bookmark added!");
    }

    get_list()
    {
        return this.bookmark_list;
    }

    save_local()
    {
        localStorage.setItem("bookmarks", JSON.stringify(this.bookmark_list))
    }

    load_local()
    {
        const data = localStorage.getItem("bookmarks");

        if(data)
        {
            const parsed = JSON.parse(data);
            this.bookmark_list = parsed.map(b => new bookmarks(b.name, b.link));
        }
    }
}

// functions
function renderEach(domID, array) {
    const domElement = document.getElementById(domID);
    domElement.innerHTML = "";
    
    array.forEach(element => {
        const li = document.createElement("li");
        li.classList.add("bg-neutral-800",  // Match dark mode theme
            "text-white",
            "hover:bg-neutral-700",
            "m-4", "p-4",       // Padding and margin
            "rounded-xl",       // Smooth corners
            "shadow-md",        // Slight elevation
            "transition", "duration-200" // Smooth hover
        );
        li.innerHTML = `
  <h2 class="text-lg font-semibold mb-1">${element["name"]}</h2>
  <a href="${element["link"]}" class="text-blue-400 hover:underline break-all">${element["link"]}</a>
`;
        domElement.append(li);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const bName = document.getElementById("bookmark_name");
    const blink = document.getElementById("bookmark_link");
    const btn = document.getElementById("bk_button");

    // Bookmark class instance
    const bookmark_list = new bookmarks_list();
    bookmark_list.load_local();

    // Initial render
    renderEach("bookmark_list", bookmark_list.get_list());

    // On button click
    btn.addEventListener("click", function () {
        if (bName.value === "" || blink.value === "") return;
        bookmark_list.add(bName.value, blink.value);
        renderEach("bookmark_list", bookmark_list.get_list());
    });
});
