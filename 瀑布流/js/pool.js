(function(win) {
	var plugin = {

		/*
			初始化
			id: 容纳box的元素id
		*/
		init: function(id) {
			var parent = document.getElementById(id);
			var boxes = this.tools.getElementByClassName(parent, "box");
			var lineNum = this.getLineBoxes(id, boxes[0]);
			this.setBoxesPosition(boxes, lineNum);
		},

		/*
			获取一行的box数目
			id: 容纳box的元素id
			box:  box元素
		*/
		getLineBoxes: function(id, box) {
			var containerWidth = document.getElementById(id).clientWidth;
			var boxWidth = box.clientWidth;
			return Math.ceil(containerWidth / boxWidth) - 1;
		},

		/*
			设置box距离顶部的位置
			boxes: box元素数组
			lineNum: 一行有多少个box
		*/
		setBoxesPosition: function(boxes, lineNum) {
			// 一列最后一个box的底部距离顶部的距离
			var boxesHeight = [];
			var index = 0;
			for (var i = 0; i < boxes.length; i++) {
				// 第一行box
				if (i < lineNum) {
					// 设置一列第i + 1个位置的box的底部距离顶部的距离
					boxesHeight[i] = boxes[i].offsetTop + boxes[i].clientHeight;
					// 距离左边的距离
					boxes[i].style.left = boxes[i].clientWidth * i + "px";
					continue;
				}
				// 后面每次从距离顶部最短的开始排
				index = this.tools.getMinIndexFromArray(boxesHeight);
				boxes[i].style.top = boxesHeight[index] + "px";
				boxes[i].style.left = boxes[i].clientWidth * index + "px";
				boxesHeight[index] += boxes[i].clientHeight;
			}
		},

		// 工具
		tools: {
			/*
				根据class获取元素
				className: 元素的class
				parent: 父元素
			*/
			getElementByClassName: function(parent, className) {
				var elements = [];
				var allElements = parent.getElementsByTagName('*');
				for (var i = 0; i < allElements.length; ++i) {
					if (allElements[i].getAttribute("class") === className) {
						elements.push(allElements[i]);
					}
				}
				return elements;
			},

			/*
				获取数组中最小值的索引
				arr: 数组
			*/
			getMinIndexFromArray: function(arr) {
				var min = arr[0];
				var index = 0;
				for (var i = 1; i < arr.length; i++) {
					if (arr[i] < min) {
						index = i;
						min = arr[i];
					}
				}
				return index;	
			}
		}
	};

	win.waterFall = {
		init: function(id) {
			plugin.init(id)
		}
	};

})(window);
