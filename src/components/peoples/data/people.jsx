export const confluenceTeam = [
    { name: "Alexander", role: "Product Manager" },
    { name: "Arjun", role: "Software Engineer" },
    { name: "Ed", role: "Software Engineer" },
    { name: "Gael", role: "Engineering Manager" },
    { name: "Ivan", role: "Content Designer" },
    { name: "Lydia", role: "Design Manager" },
    { name: "Narul", role: "Product Manager" },
    { name: "Renato", role: "Principal Engineer" },
    { name: "Vania", role: "Lead Designer" },
    { name: "Angie", role: "Senior Engineer" },
    { name: "Colin", role: "Software Engineer" },
    { name: "Fabian", role: "Senior Designer" }
].map((person) => {
    return {
        ...person,
        // avatarUrl: loadAvatar(person.name),
        itemId: person.name
    };
});

export const jiraTeam = [
    { name: "Helena", role: "Design Researcher" },
    { name: "Leo", role: "Content Designer" },
    { name: "Myra", role: "Engineering Manager" },
    { name: "Rahul", role: "Product Manager" },
    { name: "Tori", role: "Senior Designer" },
    { name: "Alvin", role: "Senior Engineer" },
    { name: "Claudia", role: "Senior Engineer" },
    { name: "Eliot", role: "Lead Designer" }
].map((person) => {
    return {
        ...person,
        // avatarUrl: loadAvatar(person.name),
        itemId: person.name
    };
});

export const trelloTeam = [
    { name: "Hasan", role: "Designer" },
    { name: "Lara", role: "Design Researcher" },
    { name: "Milo", role: "Product Manager" },
    { name: "Oliver", role: "Senior Designer" },
    { name: "Tanya", role: "Engineering Manager" },
    { name: "Aliza", role: "Design Manager" },
    { name: "Blair", role: "Program Manager" },
    { name: "Effie", role: "Senior Engineer" },
    { name: "Gerard", role: "Design Manager" },
    { name: "Katina", role: "Program Manager" }
].map((person) => {
    return {
        ...person,
        // avatarUrl: loadAvatar(person.name),
        itemId: person.name
    };
});

export function getInitialData() {
    const columnMap = {
        confluence: {
            title: "Confluence",
            columnId: "confluence",
            items: confluenceTeam
        },
        jira: {
            title: "Jira",
            columnId: "jira",
            items: jiraTeam
        },
        trello: {
            title: "Trello",
            columnId: "trello",
            items: trelloTeam
        }
    };

    const orderedColumnIds = ["confluence", "jira", "trello"];

    return {
        columnMap,
        orderedColumnIds
    };
}
