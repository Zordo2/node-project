const baseUrl = "http://localhost:3000/";
const getAll = async () => {
  const response = await fetch(`${baseUrl}products`);
  return response.json();
};
const getOne = async (productId) => {
  const response = await fetch(`${baseUrl}products/${productId}`);
  return response.json();
};
const post = async (data) => {
  const response = await fetch(`${baseUrl}products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
const patch = async (productId, updatedData) => {
  const response = await fetch(`${baseUrl}products/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  return response.json();
};
const remove = async (productId) => {
  const response = await fetch(`${baseUrl}products/${productId}`, {
    method: "DELETE",
  });
  return response.json();
};
export { getAll, getOne, post, patch, remove };
