

export default function fixData(dataArray) {
  let fixedData = [];
  let freeze = 0;

  dataArray.forEach(book => {
    if (!fixedData[freeze]) {
      fixedData.push({
        bookCode: book.bookCode,
        title: book.title,
        publisherCode: book.publisherCode,
        type: book.type,
        paperback: book.paperback,
        url: book.url,
        authorNum: [],
        authorName: [],
        publisherCode: [],
        branchNum: [],
        branchName: [],
        branchLocation: [],
        copyNum: []
      });
    }

    if (fixedData[freeze].title === book.title) {
      if (!fixedData[freeze].authorNum.includes(book.authorNum)) {
        fixedData[freeze].authorNum.push(book.authorNum);
        fixedData[freeze].authorNum.filter(
          (a, b) => fixedData[freeze].authorNum.indexOf(a) === b
        );
      }

      if (
        !fixedData[freeze].authorName.includes(
          `${book.authorFirst}, ${book.authorLast} `
        )
      ) {
        fixedData[freeze].authorName.push(
          `${book.authorFirst}, ${book.authorLast} `
        );
        fixedData[freeze].authorName.filter(
          (a, b) => fixedData[freeze].authorName.indexOf(a) === b
        );
      }

      if (!fixedData[freeze].publisherCode.includes(book.publisherCode)) {
        fixedData[freeze].publisherCode.push(book.publisherCode);
        fixedData[freeze].publisherCode.filter(
          (a, b) => fixedData[freeze].publisherCode.indexOf(a) === b
        );
      }
      if (!fixedData[freeze].branchNum.includes(book.branchNum)) {
        fixedData[freeze].branchNum.push(book.branchNum);
        fixedData[freeze].branchNum.filter(
          (a, b) => fixedData[freeze].branchNum.indexOf(a) === b
        );
      }

      if (!fixedData[freeze].branchName.includes(book.branchName)) {
        fixedData[freeze].branchName.push(book.branchName);
        fixedData[freeze].branchName.filter(
          (a, b) => fixedData[freeze].branchName.indexOf(a) === b
        );
      }

      if (!fixedData[freeze].branchLocation.includes(book.branchLocation)) {
        fixedData[freeze].branchLocation.push(book.branchLocation);
        fixedData[freeze].branchLocation.filter(
          (a, b) => fixedData[freeze].branchLocation.indexOf(a) === b
        );
      }

      if (!fixedData[freeze].copyNum.includes(book.copyNum)) {
        fixedData[freeze].copyNum.push(book.copyNum);
        fixedData[freeze].copyNum.filter(
          (a, b) => fixedData[freeze].copyNum.indexOf(a) === b
        );
      }
    } else {
      freeze++;
    }
  });
  return fixedData;
}
