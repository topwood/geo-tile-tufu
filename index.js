//default rectangle
var _rectangle = [-180, -90, 180, 90];

function getNumberOfXTilesAtLevel(level) {
	return 2 << level;
}

function getNumberOfYTilesAtLevel(level) {
	return 1 << level;
}

/**
 * @param  {Array} 经纬度坐标点,数组
 * @param  {Number} 级别
 * @return {Array} 瓦片坐标
 */
function positionToTileXY(position, level) {
	var xTiles = getNumberOfXTilesAtLevel(level);
	var yTiles = getNumberOfYTilesAtLevel(level);

	var xTileWidth = (_rectangle[2] - _rectangle[0]) / xTiles;
	var yTileHeight = (_rectangle[3] - _rectangle[1]) / yTiles;

	var longitude = position[0];

	var xTileCoordinate = (longitude - _rectangle[0]) / xTileWidth | 0;
	if (xTileCoordinate >= xTiles) {
		xTileCoordinate = xTiles - 1;
	}

	var yTileCoordinate = (_rectangle[3] - position[1]) / yTileHeight | 0;
	if (yTileCoordinate >= yTiles) {
		yTileCoordinate = yTiles - 1;
	}
	//
	yTileCoordinate = yTiles - 1 - yTileCoordinate;
	return [xTileCoordinate, yTileCoordinate];
}


/**
 * 经纬度范围转换为瓦片坐标范围。
 * @param {geoBounds} [Array] [经纬度范围]
 * @param {level} [Number] [级别]
 * @return [Object] [瓦片范围]
 */
exports.geo2tile = function(geoBounds, level) {
	//geoBounds = [-180, 40, 170, 80];
	//level = 2;
	var bottom_left = [geoBounds[0], geoBounds[1]];
	var top_right = [geoBounds[2], geoBounds[3]];

	var bottom_left_cor = positionToTileXY(bottom_left,level);
	var top_right_cor =  positionToTileXY(top_right,level);

	return {
		minx: bottom_left_cor[0],
		maxy: top_right_cor[1],
		maxx: top_right_cor[0],
		miny: bottom_left_cor[1]
	}
}

exports.tufu2geo = function(){
	//todo
}
