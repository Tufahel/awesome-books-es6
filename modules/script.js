let lastId = 0;
const showList = document.getElementById('show_list');
const btnSave = document.getElementById('addBtn');
let removeData;
let dataList;

export const init = () => {
  if (window.localStorage.getItem('dataList')) {
    dataList = JSON.parse(window.localStorage.getItem('dataList'));
  } else {
    dataList = [];
  }
  btnSave.addEventListener('click', saveData);
  showData();
}

export const showData = () => {
  if (dataList.length) {
    getLastTaskId();
    for (const item in dataList) {
      const data = dataList[item];
      addDataToList(data);
    }
    syncEvents();
  }
}

export const saveData = () => {
  const data = {
    dataId: lastId,
    dataTitle: document.getElementById('title').value,
    dataAuthor: document.getElementById('author').value,
  };
  dataList.push(data);
  syncTask();
  addDataToList(data);
  syncEvents();
  lastId++;
}

export const addDataToList = (data) => {
  const removeData = document.createElement('span');
  const element = document.createElement('li');
  const line = document.createElement('div');

  element.setAttribute('id', data.dataId);
  if (data.dataTitle !== '' && data.dataAuthor !== '') {
    element.innerHTML += `<span>${data.dataTitle}</span> by <span>${data.dataAuthor}</span><br> `;
    removeData.innerHTML = '<button>Remove</button>';
    removeData.className = 'remove_data';
    removeData.setAttribute('title', 'Remove');
    element.appendChild(removeData);
    showList.appendChild(element);
  }
}

export const removeDta = (event) => {
  const dataToRemove = event.currentTarget.parentNode;
  console.log('data to remove', dataToRemove);
  const dataId = dataToRemove.id;
  console.log('data to remove id', dataToRemove.id);
  showList.removeChild(dataToRemove);
  dataList.forEach((value, i) => {
    if (value.dataId == dataId) {
      dataList.splice(i, 1);
    }
  });
  syncTask();
}

export const syncTask = () => {
  window.localStorage.setItem('dataList', JSON.stringify(dataList));
  dataList = JSON.parse(window.localStorage.getItem('dataList'));
}

export const getLastTaskId = () => {
  const lastTask = dataList[dataList.length - 1];
  lastId = lastTask.dataId + 1;
}

export const syncEvents = () => {
  removeData = document.getElementsByClassName('remove_data');
  if (removeData.length) {
    for (let i = 0; i < removeData.length; i++) {
      removeData[i].addEventListener('click', removeDta);
    }
  }
}

init();
