import * as productApi from "./api/product.js";
const addProductForm = document.forms["addProductForm"];
const updateProductForm = document.forms["updateProductForm"];
const productListHook = document.getElementById("product-list-hook");
const productItem = (product) => {
  const { _id: productId, name, price, quantity } = product;
  return `<tr>
          <td>${name}</td>
          <td>${quantity}</td>
          <td>${price} $</td>
          <td><button 
          data-bs-toggle="modal"
          data-bs-target="#updateProductForm"
          class="btn bnt-primary edit-btn"
          data-id=${productId}
          >edit</button></td>
          <td><button class="btn bnt-danger delete-btn" data-id=${productId}>delete</button></td>
        </tr>`;
};
const renderProductList = () => {
  productApi
    .getAll()
    .then((response) => {
      productListHook.innerHTML = "";
      const products = response.products.reverse();
      let productHtml = ``;
      for (let product of products) {
        productHtml += productItem(product);
      }
      productListHook.insertAdjacentHTML("afterbegin", productHtml);
      deleteProductListener();
      editProductListener();
    })
    .catch((error) => {
      alert(error.message);
    });
};
addProductForm.onsubmit = (e) => {
  e.preventDefault();
  const name = e.target["name"].value;
  const price = e.target["price"].value;
  const quantity = e.target["quantity"].value;
  if (name == "" || price <= 0 || quantity <= 0) {
    return alert("please enter valid data");
  }
  productApi
    .post({ name, price, quantity })
    .then((response) => {
      confirm("product added ");
      e.target.reset();
      renderProductList();
    })
    .catch((err) => {
      alert(err.message);
    });
};
function deleteProductListener() {
  const btns = document.querySelectorAll("button.delete-btn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
      const confirm = window.confirm("product will deleted !");
      if (!confirm) return;
      const productId = this.getAttribute("data-id");
      productApi
        .remove(productId)
        .then((response) => {
          renderProductList();
        })
        .catch((error) => {
          alert(error.message);
        });
    };
  }
}
function editProductListener() {
  const btns = document.querySelectorAll("button.edit-btn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
      const productId = this.getAttribute("data-id");
      productApi.getOne(productId).then((response) => {
        const { _id, name, price, quantity } = response.product;
        updateProductForm["name"].value = name;
        updateProductForm["price"].value = price;
        updateProductForm["quantity"].value = quantity;
        updateProductForm["productId"].value = _id;
      });
    };
  }
}
updateProductForm.onsubmit = (e) => {
  e.preventDefault();
  const productId = e.target["productId"].value;
  console.log(productId);
  const name = e.target["name"].value;
  const price = e.target["price"].value;
  const quantity = e.target["quantity"].value;
  if (name == "" || price <= 0 || quantity <= 0) {
    return alert("please enter valid data");
  }
  productApi
    .patch(productId, { name, price, quantity })
    .then((response) => {
      renderProductList();
      alert("product updated ");
    })
    .catch((err) => {
      alert(err.message);
    });
};
renderProductList();
