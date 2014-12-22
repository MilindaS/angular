angular.module('nics.Cipher', []).
value('CipherBoom', function() {
    var parent = {
        encrypt: function(string) {
            var s = (typeof string == 'object' || typeof string == 'number') ? string.toString() : string;
            var encrypted = CryptoJS.Rabbit.encrypt(s, "SecretPassphrase");
            return encrypted.toString();
        },
        decrypt: function(cipher) {
            var decrypted = CryptoJS.Rabbit.decrypt(cipher, "SecretPassphrase");
            var s = decrypted.toString(CryptoJS.enc.Utf8)
            if (/^\d+$/.test(s)) {
                return parseInt(s);
            } else {
                return s;
            }
        },
        getEncryptedObject: function(obj) {
            v = this.getCipherObject(obj);
            return v;
        },
        getDecryptedObject: function(obj) {
            return this.getCipherObject(obj, 'dec');
        },

        getCipherObject: function(obj, mode) {
            mode = (typeof mode != 'undefined' && mode == 'dec') ? 'dec' : 'enc';
            var changedObj = {};
            var looper = {
                init: function(obj) {
                    this.loopThrough(obj);
                },
                loopThrough: function(object) {
                    _.each(object, function(value, attribute) {
                        //keeping id
                        if (attribute == 'id') {
                            changedObj[attribute] = object[attribute];
                        } else {
                            var key = (mode == 'enc') ? parent.encrypt(attribute) : parent.decrypt(attribute);
                            changedObj[key] = looper.fixObject(value);
                        }
                    });
                },
                fixObject: function(v) {
                    if (Array.isArray(v)) {
                        var ret = [];
                        _.each(v, function(el) {
                            ret.push(looper.fixObject(el));
                        });
                    } else if (typeof v == 'object') {
                        var ret = {};
                        _.each(v, function(ov, oi) {
                            var key = (mode == 'enc') ? parent.encrypt(oi) : parent.decrypt(oi);
                            ret[key] = looper.fixObject(ov);
                        });
                    } else if (typeof v == 'string' || typeof v == 'number') {
                        ret = (mode == 'enc') ? parent.encrypt(v) : parent.decrypt(v);
                    } else {
                        //  console.log(v);
                    }
                    return ret;
                },
                getEncryted: function(str) {
                    return parent.encrypt(str);
                },
                getDecrypted: function(cipher) {
                    return parent.decrypt(cipher);
                }
            }
            looper.init(obj);
            return changedObj;

        }
    };
    return parent;
});