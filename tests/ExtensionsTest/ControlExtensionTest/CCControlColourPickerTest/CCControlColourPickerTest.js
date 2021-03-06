/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var ControlColourPickerTest = ControlScene.extend({
    _colorLabel:null,
    init:function () {
        if (this._super()) {
            var screenSize = cc.Director.getInstance().getWinSize();

            var layer  = cc.Node.create();
            layer.setPosition(cc.p (screenSize.width / 2, screenSize.height / 2));
            this.addChild(layer, 1);

            var layer_width = 0;

            // Create the colour picker
            var colourPicker = cc.ControlColourPicker.create();
            colourPicker.setColor(cc.c3b(37, 46, 252));
            colourPicker.setPosition(cc.p (colourPicker.getContentSize().width / 2, 0));

            // Add it to the layer
            layer.addChild(colourPicker);

            // Add the target-action pair
            colourPicker.addTargetWithActionForControlEvents(this,this.colourValueChanged,  cc.CONTROL_EVENT_VALUECHANGED);


            layer_width += colourPicker.getContentSize().width;

            // Add the black background for the text
            var background = cc.Scale9Sprite.create("res/extensions/buttonBackground.png");
            background.setContentSize(cc.size(150, 50));
            background.setPosition(cc.p(layer_width + background.getContentSize().width / 2.0, 0));
            layer.addChild(background);

            layer_width += background.getContentSize().width;

            this._colorLabel = cc.LabelTTF.create("#color", "Marker Felt", 30);
            this._colorLabel.retain();

            this._colorLabel.setPosition(background.getPosition());
            layer.addChild(this._colorLabel);

            // Set the layer size
            layer.setContentSize(cc.size(layer_width, 0));
            layer.setAnchorPoint(cc.p (0.5, 0.5));

            // Update the color text
            this.colourValueChanged(colourPicker, cc.CONTROL_EVENT_VALUECHANGED);
            return true;
        }
        return false;
    },
    colourValueChanged:function (sender, controlEvent) {
        // Change value of label.
        this._colorLabel.setString(cc.convertColor3BtoHexString(sender.getColor()).toUpperCase());
    }
});
ControlColourPickerTest.create = function (sceneTitle) {
    var scene = cc.Scene.create();
    var controlLayer = new ControlColourPickerTest();
    if (controlLayer && controlLayer.init()) {
        controlLayer.getSceneTitleLabel().setString(sceneTitle);
        scene.addChild(controlLayer);
    }
    return scene;
};