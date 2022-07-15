var url = 'https://admin-panel-data-edyoda-sourav.herokuapp.com/admin/data';

let tbody = document.querySelector('tbody');
let info = document.querySelector('#info-content');
let search = document.querySelector('#search-box');

getData();
async function getData() {
  try {
    const res = await fetch(url);
    let data = await res.json();
    data.map((item) => {
      tbody.innerHTML += `<tr class="data-row">
      <td class="column1">${item.id}</td>
      <td class="column2">${item.firstName}</td>
      <td class="column3">${item.lastName}</td>
      <td class="column4">${item.email}</td>
      <td class="column5">${item.phone}</td>
    </tr>`;
    });
    let tr = document.querySelectorAll('tr');
    //   console.log(activeRow);

    tr.forEach((rows) => {
      rows.addEventListener('click', function () {
        rows.className = 'data-row';
        // activeRow.classList.remove("active");
        var activeEle = document.querySelector('.active');
        if (activeEle === null) {
          this.classList.add('active'); //if we click
        } else {
          activeEle.classList.remove('active'); //else we click other
        }
        this.classList.add('active'); //other get active

        //select element to display
        // console.log(this.firstElementChild.innerText); //we get the id of single element

        let selectedId = this.firstElementChild.innerText;

        data.map((item) => {
          //   console.log(selectedId, item.id);
          if (selectedId == item.id) {
            info.innerHTML = `<div><b>User selected:</b> ${item.firstName} ${item.lastName}</div>
        <div>
            <b>Description: </b>
            <textarea cols="50" rows="5" readonly>
                ${item.description}
            </textarea>
        </div>
        <div><b>Address:</b> ${item.address.streetAddress}</div>
        <div><b>City:</b> ${item.address.city}</div>
        <div><b>State:</b> ${item.address.state}</div>
        <div><b>Zip:</b> ${item.address.zip}</div>
        `;
            info.style.display = 'block';
            return;
          }
        });
      });
      rows.classList.remove('active');
    });
  } catch (err) {
    console.log(err);
  }
}

search.addEventListener('input', function (e) {
  //   console.log(e.target.value);
  let tr = document.getElementsByTagName('tr');
  let tableContent = '';
  for (let i = 1; i < tr.length; i++) {
    // console.log(tr[i].innerText.includes(e.target.value));
    if (tr[i].innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
      tr[i].style.display = '';
    } else {
      tr[i].style.display = 'none';
    }
  }
});
