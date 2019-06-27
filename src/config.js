export const [adminId, appId, device, platform] = window.location.hash
    .slice(1)
    .split('/')
    .filter(x => !!x);
    
console.log([adminId, appId, device, platform])
export const name = 'Test Title';

