let movement = false

function checking(tatic, arr) {
    if (movement === false) {
        for (let j = 0; j < winStates.length; j++) {
            let seq = winStates[ j ];
            let pos1 = seq[ 0 ];
            let pos2 = seq[ 1 ];
            let pos3 = seq[ 2 ];
            movement = tatic(pos1, pos2, pos3, arr);
            if (movement === true) {
                break;
            }
        }
    }
}

function draw(pos1, pos2, pos3, arr) {
    // ============================================DRAW-MOVE=====================================================

    if (arr[ pos1 ] === "square") {
        updateClass(pos1);
        return true;
    }
    if (arr[ pos2 ] === "square") {
        updateClass(pos2);
        return true;
    }
    if (arr[ pos3 ] === "square") {
        updateClass(pos3);
        return true;
    }
    return false;
    // ===========================================================================================================
}


function first(pos1, pos2, pos3, arr) {
    // ============================================FIRST-MOVE=====================================================

    if (arr[ pos1 ] === "square" && arr[ pos2 ] === "square" && arr[ pos3 ] === "square") {
        updateClass(pos2);
        return true;
    }
    return false;
    // ===========================================================================================================
}

function win(pos1, pos2, pos3, arr) {
    // ============================================WIN-MOVE=======================================================

    if (arr[ pos1 ] === `square ${botSymbol}` && arr[ pos2 ] === `square ${botSymbol}` && arr[ pos3 ] === "square") {
        updateClass(pos3);
        return true;
    }
    if (arr[ pos1 ] === `square ${botSymbol}` && arr[ pos3 ] === `square ${botSymbol}` && arr[ pos2 ] === "square") {
        updateClass(pos2);
        return true;
    }
    if (arr[ pos2 ] === `square ${botSymbol}` && arr[ pos3 ] === `square ${botSymbol}` && arr[ pos1 ] === "square") {
        updateClass(pos1);
        return true;
    }
    return false;
    // ===========================================================================================================
}


function middle(pos1, pos2, pos3, arr) {
    // ===========================================MIDDLE-MOVE=====================================================
    if (arr[ pos1 ] === `square ${botSymbol}` && arr[ pos2 ] === "square" && arr[ pos3 ] === "square") {
        updateClass(pos3);
        return true;
    }
    if (arr[ pos2 ] === `square ${botSymbol}` && arr[ pos3 ] === "square" && arr[ pos1 ] === "square") {
        updateClass(pos3);
        return true;
    }
    if (arr[ pos3 ] === `square ${botSymbol}` && arr[ pos2 ] === "square" && arr[ pos1 ] === "square") {
        updateClass(pos1);
        return true;
    }
    return false;
    // ===========================================================================================================
}


function defense(pos1, pos2, pos3, arr) {  // ============================================DEFENSE===================================================
    if (arr[ pos1 ] === arr[ pos2 ] && arr[ pos1 ] !== arr[ pos3 ] && arr[ pos1 ] !== "square" && arr[ pos3 ] === "square") {
        updateClass(pos3);
        return true;
    }
    if (arr[ pos1 ] === arr[ pos3 ] && arr[ pos1 ] !== arr[ pos2 ] && arr[ pos1 ] !== "square" && arr[ pos2 ] === "square") {
        updateClass(pos2);
        return true;
    }
    if (arr[ pos2 ] === arr[ pos3 ] && arr[ pos2 ] !== arr[ pos1 ] && arr[ pos2 ] !== "square" && arr[ pos1 ] === "square") {
        updateClass(pos1);
        return true;
    }
    return false;
    // ===========================================================================================================}
}
function specialDefense(arr) {
    let clientPlays = arr.filter((it) => { return it === "square X" });
    if (arr[ 4 ] === "square X" && clientPlays.length === 1) {
        updateClass(2);
        return movement = true;
    }
    return movement = false;
}


function sweetSquares(arr) {
    specialDefense(arr);
    checking(win, arr);
    checking(defense, arr);
    checking(middle, arr);
    checking(first, arr);
    checking(draw, arr);
    movement = false;
}
