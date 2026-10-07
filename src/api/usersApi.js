const baseUrl = "https://nqvhvftqizfpdofbwzgz.supabase.co/rest/v1/users";
const apiKey = "sb_publishable_KCjKFPZr5cp80Hzc382tKg_3ceDWVu4";

export async function fetchUsers() {
    const response = await fetch(baseUrl, {
        headers: {
            "apikey": apiKey    
        }
    });
    const data = await response.json();
    return data;
}
